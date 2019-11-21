export class Client {
  constructor(c) {
    if (!c) {
      return
    }
    this.clientID = c.pk
    this.avatar = c.avatar
    this.first_name = c.first_name
    this.last_name = c.last_name
    this.middle_name = c.middle_name
    this.client_type = c.client_type
    this.company_name = c.company_name
    this.workspace = c.workspace
    this.enable_portal = c.enable_portal
    this.emails = c.emails || []
    this.phones = c.phones || []
    this.websites = c.websites || []
    this.addresses = c.addresses || []
    this.managers = c.managers || []

    this.name = this.getName() || 'N/A'
  }

  getName() {
    return this.first_name + ' ' + this.last_name
  }

  addAddresses() {

  }

  addWebsites() {

  }

  addManagers() {

  }

  addPhones() {

  }


}

let a = {
  'pk': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  'avatar': 'string',
  'first_name': 'string',
  'last_name': 'string',
  'middle_name': 'string',
  'client_type': 'i',
  'company_name': 'string',
  'workspace': 'string',
  'enable_portal': true,
  'emails': [
    {
      'email': 'user@example.com',
      'email_type': 'h',
      'primary': false
    }
  ],
  'phones': [
    {
      'phone_number': 'string',
      'phone_type': 'h',
      'primary': false
    }
  ],
  'websites': [
    {
      'website': 'string',
      'website_type': 'w',
      'primary': false
    }
  ],
  'addresses': [
    {
      'country': 'AF',
      'street': 'string',
      'city': 'string',
      'state': 'string',
      'postal_code': 'string',
      'address_type': 'w'
    }
  ],
  'managers': [
    {
      'billing_rate': 'string',
      'user': 0
    }
  ]
}
