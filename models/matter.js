
export class Matter {
  constructor (c) {
    this.canUpdate = true
    if (!c) {
      this.members = []
      return
    }

    this.matterID = c.id
    this.name = c.name
    this.clients = c.clients || []
    this.intro = c.intro
    this.jurisdiction = c.jurisdiction
    this.claims = c.claims
    this.complaints = c.complaints
    this.members = c.members || [] // []string
    this.types = c.types || [] // []string
    this.jury_demand = !!c.jury_demand
    this.activate = !!c.activate
    this.archive = !!c.archive
    this.priority = c.priority // 1,2,3,4,5
    this.risk_level = c.risk_level // 1,2,3,4,5
    this.date_filled = c.date_filled
    this.start_date = c.start_date
    this.est_time = c.est_time
    this.next_courts = c.next_courts || []
    this.creator = c.creator

    this.canUpdate = false


  }

  fuzzyKeys () {
    return {
      name: this.name,
    }
  }

  suggestionLabel () {
    return this.name || this.matterID || ''
  }

  isMember (userID) {
    return this.members.indexOf(userID) !== -1
  }

  removeMember (user) {
    const ID = (user || {}).id || user
    this.members = this.members.filter(m => m !== ID)
  }

  isPublic () {
    return this.type === 'public'
  }

  isValid () {
    return !this.deletedAt && !this.archivedAt
  }


}
