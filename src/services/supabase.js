import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://jsqgvluvucppscxvvczc.supabase.co/', 'sb_publishable_BUOQ1kKckyaWBBXKuD98Eg_QAxK-KwY')

export default supabase