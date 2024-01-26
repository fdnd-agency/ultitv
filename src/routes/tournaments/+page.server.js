import { supabase } from '$lib/supabase';

export async function load({ params }) {
    const tournamentRequest = await supabase
        .from('tournaments')
        .select('*')

    return { tournaments: tournamentRequest.data }
}

