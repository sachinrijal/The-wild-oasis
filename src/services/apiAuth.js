import supabase, { supabase_url } from "./supabase";

export async function SignUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: ""
      }
    }
  })

  if (error) throw new Error(error.message);

  return data;
}


export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });


  if (error) throw new Error(error.message);

  return data;
}



export async function getUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getSession()

  if (error) throw new Error(error.message);

  return data?.session?.user;
}


export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateUser({ fullName, avatar, password }) {

  let obj = {}
  if (fullName) obj.data = { fullName };
  if (password) obj.password = password;

  const { data, error } = await supabase.auth.updateUser(obj);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2) avatar 

  const fileName = `avatar-${data.user.id}-${Math.random()}`

  const { error: storageError } = await supabase.storage.from("avatar").upload(fileName, avatar)
  if (storageError) throw new Error(storageError.message);

  // 3) uploading avatar 

  const { data : updatedUser, error: error2 }  = await supabase.auth.updateUser({ data: { avatar: `${supabase_url}storage/v1/object/public/avatar/${fileName}`} })

  if (error2) throw new Error(error2.message);

  return updatedUser
}





