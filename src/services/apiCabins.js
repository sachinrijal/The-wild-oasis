import supabase from "./supabase";

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

export async function createCabin(newCabin) {


    const { error } = await supabase
        .from('cabin')
        .insert([newCabin])
        .select()


    if (error) {
        console.error(error);
        throw new Error("error while creating the row  ");
    }

}