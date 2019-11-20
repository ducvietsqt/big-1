export class Court {
  constructor(c) {
    if (!c) {
      // this.members = []
      return
    }
    this.courtID = c.id
    this.stages = c.stages || []
    this.pacer_court_id = c.pacer_court_id
    this.pacer_has_rss_feed = c.pacer_has_rss_feed
    this.fjc_court_id = c.fjc_court_id
    this.date_modified = c.date_modified
    this.in_use = c.in_use
    this.has_opinion_scraper = c.has_opinion_scraper
    this.has_oral_argument_scraper = c.has_oral_argument_scraper
    this.position = c.position
    this.citation_string = c.citation_string
    this.short_name = c.short_name
    this.full_name = c.full_name
    this.url = c.url
    this.start_date = c.start_date
    this.end_date = c.end_date
    this.jurisdiction = c.jurisdiction
    this.notes = c.notes
  }

  setStages(stages) {
    this.stages = [...stages]
  }

}
