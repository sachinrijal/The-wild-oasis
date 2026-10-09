import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

export const supabase_url = "https://jsqgvluvucppscxvvczc.supabase.co/"

const supabase = createClient(supabase_url, 'sb_publishable_BUOQ1kKckyaWBBXKuD98Eg_QAxK-KwY')

export default supabase