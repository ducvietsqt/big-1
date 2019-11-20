export class Member {
  constructor(c) {
    if (!c) {
      return
    }
    this.userID = c.user.pk
    this.name = c.user.name
    this.avatar = c.user.avatar
    this.email = c.user.email
    this.username = c.user.username
    this.first_name = c.user.first_name
    this.last_name = c.user.last_name
    this.phone = c.user.phone
    this.birthday = c.user.birthday

    this.role = c.role
    this.created = c.created
    this.creator = c.creator

    this.hasAvatar = this.hasProps(this.avatar)
  }
  hasProps(prop) {
    return !!prop
  }


  hasPhone() {
    return !!this.phone
  }

  hasEmail() {
    return !!this.email
  }

  fullName() {
    if (this.name) return this.name
    if (this.username) return this.username
    return this.email
  }

  isCreator() {
    return this.creator === this.userID
  }

  isRoleOwner() {
    return this.role === 1
  }

  isRoleManager() {
    return this.role === 2
  }

  isRoleNormal() {
    return this.role === 3
  }
  roleTitle() {
    switch (this.role) {
      case 1:
        return 'Owner';
      case 2:
        return 'Manager';
      default:
        return 'Normal'
    }
  }


}

let a = {
  "user": {
    "pk": 3,
    "name": "user1@example.com",
    "avatar": null,
    "email": "user1@example.com",
    "username": "55a2f8c0-41c3-4df7-ab6f-293692ab6674",
    "first_name": "",
    "last_name": "",
    "phone": "",
    "birthday": null
  },
  "role": 3,
  "created": "2019-07-18T16:40:30.831887Z",
  "creator": 2
}
