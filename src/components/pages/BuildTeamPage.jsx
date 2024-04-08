import React from 'react'
import TeamBuilder from '../TeamBuilder'
import SearchSection from '../SearchSection'
import DisplayTeamBuilder from '../DisplayTeamBuilder'

export default function BuildTeamPage() {
  return (
    <div>
        <TeamBuilder />
        <SearchSection />
        <DisplayTeamBuilder />
    </div>
  )
}
