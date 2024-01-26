import { supabase } from '$lib/supabase';

export async function load({ params }) {
    const matchesRequest = await supabase
        .from('matches')
        .select('*')

    return { matches: matchesRequest.data }
}

