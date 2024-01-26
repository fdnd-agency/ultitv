import { supabase } from '$lib/supabase';

export async function load({ params }) {
    const matchRequest = await supabase
        .from('matches')
        .select('*, team_a (*, country (*)), team_b (*, country (*)), tournament (*)')
        .eq('id', params.uid)
        .single()

    // Fetch the lineups for team_a
    const playersTeamA = await supabase
        .from('lineups')
        .select('*, ...player (*)')
        .eq('team', matchRequest.data.team_a.id)
        .eq('match', params.uid)

    // Fetch the lineups for team_b
    const playersTeamB = await supabase
        .from('lineups')
        .select('*, ...player (*)')
        .eq('team', matchRequest.data.team_b.id)
        .eq('match', params.uid)

    const statisticsRequest = await supabase
        .from('statistics')
        .select('*')
        .eq('match', params.uid)

    // Add the lineups to the match data
    matchRequest.data.team_a.players = playersTeamA.data;
    matchRequest.data.team_b.players = playersTeamB.data;

    return { match: matchRequest.data, statistics: statisticsRequest.data }
}

