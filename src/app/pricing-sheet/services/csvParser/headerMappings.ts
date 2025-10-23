// ========================================
// 🏷️ Header Mapping Definitions
// ========================================
// Comprehensive mapping of various header formats to expected fields

export const HEADER_MAPPINGS = {
  // Gender variations
  gender: [
    'gender', 'sex', 'gender/sex', 'male/female', 'm/f',
    'Gender', 'Sex', 'Gender/Sex', 'Male/Female', 'M/F'
  ],

  // Age variations
  age: [
    'age', 'age at issue', 'current age', 'age (years)',
    'Age', 'Age at Issue', 'Current Age', 'Age (Years)'
  ],

  // Name variations
  firstName: [
    'first name', 'firstname', 'first', 'fname', 'name first', 'given name',
    'First Name', 'FirstName', 'First', 'FName', 'Name First', 'Given Name'
  ],
  lastName: [
    'last name', 'lastname', 'last', 'lname', 'surname', 'name last', 'family name',
    'Last Name', 'LastName', 'Last', 'LName', 'Surname', 'Name Last', 'Family Name'
  ],

  // Insurance variations
  insuranceCompany: [
    'insurance company', 'ins company', 'ins co', 'carrier', 'insurance carrier', 'company',
    'Insurance Company', 'insurance_company', 'ins_carrier', 'carrier_name',
    'structured settlement carrier', 'annuity carrier'
  ],

  // Payment type variations
  typeOfPayment: [
    'payment type', 'payment', 'pymt type', 'type', 'structure type', 'lcp/gp',
    'Payment Type', 'payment_type', 'structure_type', 'payout_type',
    'annuity_type', 'settlement_type'
  ],

  // Frequency variations
  paymentFrequency: [
    'payment frequency', 'frequency', 'freq', 'how often', 'payment freq',
    'Payment Frequency', 'payment_frequency', 'frequency_type', 'freq_type'
  ],

  // Date variations
  paymentStartDate: [
    'start date', 'start', 'begin date', 'payment start', 'commencement date',
    'Payment Start Date', 'payment start date', 'start_date', 'startdate',
    'begin_date', 'begindate', 'commencement_date', 'commencementdate',
    'payment start date', 'paymentstartdate'
  ],
  paymentEndDate: [
    'end date', 'end', 'maturity date', 'payment end', 'termination date',
    'Payment End Date', 'payment end date', 'end_date', 'enddate',
    'maturity_date', 'maturitydate', 'termination_date', 'terminationdate',
    'payment end date', 'paymentenddate'
  ],

  // Amount variations
  paymentAmount: [
    'amount', 'payment amount', 'monthly amount', 'payment', 'payout amount',
    'Payment Amount', 'payment_amount', 'amount_paid', 'monthly_payment',
    'payout', 'settlement amount', 'structured settlement amount',
    'payment amount', 'paymentamount'
  ],

  // Annual increase variations
  annualIncrease: [
    'annual increase', 'increase', 'increase %', 'increase rate', 'ann inc', 'col %',
    'Annual Increase', 'Increase', 'Increase %', 'Increase Rate', 'Ann Inc', 'Col %',
    'annual_increase', 'increase_rate', 'annual_inc', 'col_percent'
  ],

  // Contact variations
  crmId: [
    'crm id', 'crm', 'lead id', 'record id', 'crm_id', 'Lead ID', 'CRM ID'
  ],
  phone1: [
    'phone 1', 'phone1', 'primary phone', 'mobile', 'cell', 'Phone 1', 'Primary Phone'
  ],
  phone2: [
    'phone 2', 'phone2', 'secondary phone', 'alt phone', 'Phone 2', 'Secondary Phone'
  ],
  phone3: [
    'phone 3', 'phone3', 'other phone', 'alternate phone', 'Phone 3'
  ],

  // Address variations
  fullAddress: [
    'address', 'full address', 'mailing address', 'Address', 'Full Address'
  ],
  streetAddress1: [
    'street 1', 'street1', 'address 1', 'address line 1', 'Street 1', 'Address 1', 'Address Line 1'
  ],
  streetAddress2: [
    'street 2', 'street2', 'address 2', 'address line 2', 'Street 2', 'Address 2', 'Address Line 2'
  ],
  city: [
    'city', 'City'
  ],
  state: [
    'state', 'st', 'State'
  ],
  zipCode: [
    'zip', 'zip code', 'zipcode', 'postal code', 'Zip', 'ZIP Code', 'Postal Code'
  ]
}
