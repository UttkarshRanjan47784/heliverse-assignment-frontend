import React from 'react'
import TeamBuilder from '../TeamBuilder'
import DisplayAll from '../DisplayAll'
import SearchSection from '../SearchSection'
import DisplaySearched from '../DisplaySearched'

export default function BuildTeamPage() {
  return (
    <div>
        <TeamBuilder />
        <SearchSection />
        <DisplaySearched />
    </div>
  )
}
