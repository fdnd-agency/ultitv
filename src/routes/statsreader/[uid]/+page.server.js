import { supabase } from '$lib/supabase';

export async function load({ params }) {
    const matchRequest = await supabase
        .from('matches')
        .select(`
            *,
            lineups (*, ...player (*)), 
            team_a (*, country (*)), 
            team_b (*, country (*)), 
            tournament (*)
        `)
        .eq('id', params.uid)
        .single()

    const statisticsRequest = await supabase
        .from('statistics')
        .select('*, match (*), player (*), lineup (*)')
        .eq('match', params.uid)

    // Add the lineups to the match data
    matchRequest.data.team_a.players = matchRequest.data.lineups.filter(lineup => lineup.team === matchRequest.data.team_a.id);
    matchRequest.data.team_b.players = matchRequest.data.lineups.filter(lineup => lineup.team === matchRequest.data.team_b.id);

    return { 
        match: matchRequest.data, 
        statistics: statisticsRequest.data 
    }
}

