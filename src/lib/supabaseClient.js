import { createClient } from '@supabase/supabase-js'

// Hardcoded keys to ensure connection works immediately
const supabaseUrl = 'https://usbeoywpegxvgbiubtdg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYmVveXdwZWd4dmdiaXVidGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTMyMDQsImV4cCI6MjA5MDA4OTIwNH0.a40AuDQI-8IBY6koezPaOiiFLDrODIOBvNuLb4kB4ag'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
