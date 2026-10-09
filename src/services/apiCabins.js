import supabase, { supabase_url } from "./supabase";

export async function getCabins() {
    let { data, error } = await supabase
        .from('cabin')
        .select('*')
        .order("id", { ascending: true });

    if (error) {
        console.log(error);
        throw new Error("Error while getting the data ");
    }
    return data;
}

export async function deleteCabins(id) {

    const { error } = await supabase
        .from('cabin')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error);
        throw new Error("error while deleting the row ");
    }

}

export async function createEditCabin(newCabin, id = 0) {

    const hasImage = newCabin.image?.includes?.("supabase")

   
    // image name

    const image = `${Math.random()}-${newCabin.image?.name}`.replaceAll("/", "")


    // image path :  https://jsqgvluvucppscxvvczc.supabase.co/storage/v1/object/public/cabin/cabin-001.jpg
    const imagePath = hasImage ? newCabin.image : `${supabase_url}storage/v1/object/public/cabin/${image}`



    let query = supabase.from('cabin')


    // creating the cabin 
    if (!id) {
        query = query
            .insert([{ ...newCabin, image: imagePath }])
    }


    // updating the data  
    if (id) {
        query = query
            .update({ ...newCabin, image: imagePath })
            .eq('id', id)
    }


    const { data, error } = await query.select()

    if (error) {
        console.error(error);
        if (id) throw new Error("error while updating the row  ");
        throw new Error("error while creating the row  ")
    }


    if (hasImage) return data;

    
    // updating the pic in the bucket 
    const { error: bucketError } = await supabase.storage.from('cabin').upload(image, newCabin.image)
    if (bucketError) {
        console.error(bucketError);
        await supabase
            .from('cabin')
            .delete()
            .eq('id', data.id)
        throw new Error("error while uploading the photo ");
    }

    return data ;

}