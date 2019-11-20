import {Client} from "~/models/client";
import {Member} from "~/models/workspace";

export class Matter {
  constructor(c) {
    this.canUpdate = true
    if (!c) {
      this.members = []
      return
    }

    this.matterID = c.id
    this.courtID = c.court || 'ca1'
    this.name = c.name || 'N/A'
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

    // todo action tracking
    this.canUpdate = false
    this.hasCreator = this.hasProps(this.creator)
    this.hasMember = !this.emptyProp(this.members);
    this.hasClient = !this.emptyProp(this.clients);

    this.riskLevel = this.levelTitle(this.risk_level)
    this.priorityLevel = this.levelTitle(this.priority)
    this.priorityColor = this.levelColor(this.priority)
    this.riskColor = this.levelColor(this.risk_level)

  }

  fuzzyKeys() {
    return {
      name: this.name,
    }
  }

  suggestionLabel() {
    return this.name || this.matterID || ''
  }
  hasProps(prop) {
    return !!prop
  }
  emptyProp(prop) {
    return Array.isArray(prop) && prop.length <= 0
  }
  // members

  isMember(userID) {
    return this.members.indexOf(userID) !== -1
  }
  removeMember(user) {
    const ID = (user || {}).id || user
    this.members = this.members.filter(m => m !== ID)
  }

  isPublic() {
    return this.type === 'public'
  }

  isValid() {
    return !this.deletedAt && !this.archivedAt
  }

  // single select N/A, very low, low, normal, high, very high
  levelTitle(level) {
    switch (level) {
      case 1:
        return 'very low';
      case 2:
        return 'low';
      case 3:
        return 'normal';
      case 4:
        return 'high';
      case 5:
        return 'very high';
      default:
        return 'N/A'
    }
  }
  levelColor(level) {
    switch (level) {
      case 1:
        return '#37474f';
      case 2:
        return '#5e72e4';
      case 3:
        return '#ffbb33';
      case 4:
        return '#ff9f1a';
      case 5:
        return '#f5365c';
      default:
        return '#000000'
    }
  }

  // clients

  clientsMatter() {
    return [...this.clients].map(cl => new Client(cl))
  }

}
