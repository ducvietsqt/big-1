export class Character {
  constructor(c) {
    if (!c) {
      return
    }
    this.characterID = c.id || c.pk || null
    this.name = c.name
    this.created = c.created
    this.modified = c.modified
    this.character_types = c.character_types
    this.key_character = c.key_character
    this.first_name = c.first_name
    this.last_name = c.last_name
    this.avatar = c.avatar
    this.gender = c.gender
    this.birthday = c.birthday
    this.location = c.location
    this.about = c.about
    this.occupation = c.occupation
    this.skills = c.skills || []
    this.address = c.address
    this.website = c.website
    this.emails = c.emails || []
    this.phone = c.phone || []
    this.creator = c.creator
  }

}
let a = {
  "id": 0,
  "workplaces": [
    {
      "job": "string",
      "start_date": "2019-11-21",
      "end_date": "2019-11-21"
    }
  ],
  "created": "2019-11-21T07:48:43.800Z",
  "modified": "2019-11-21T07:48:43.800Z",
  "character_types": [
    1
  ],
  "key_character": true,
  "first_name": "string",
  "last_name": "string",
  "avatar": "string",
  "gender": "M",
  "birthday": "2019-11-21",
  "location": "string",
  "about": "string",
  "occupation": "string",
  "skills": [
    "string"
  ],
  "address": "string",
  "website": "string",
  "emails": [
    "user@example.com"
  ],
  "phone": [
    "string"
  ],
  "creator": 0
}
