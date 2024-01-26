import { supabase } from '$lib/supabase';

export async function load({ params }) {
    const tournamentRequest = await supabase
        .from('tournaments')
        .select('*')
        .eq('id', params.uid)
        .single()

    const matchesRequest = await supabase
        .from('matches')
        .select('*, team_a (*), team_b (*)')
        .eq('tournament', params.uid)

    return { tournament: tournamentRequest.data, matches: matchesRequest.data }
}

