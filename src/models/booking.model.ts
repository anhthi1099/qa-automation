export type CargoTabParams = {
  position: number;
  cargoType: string;
};

export type BookingFieldContainerParams = {
  fieldName?: string;
  fieldOrder?: number;
  fieldValue: string;
  section?: string;
  subSection?: string;
  subSectionPosition?: number;
  sequence?: string;
  sequenceItemPosition?: number;
};

export type InputActionParams = Pick<
  BookingFieldContainerParams,
  'fieldValue' | 'subSection' | 'fieldOrder' | 'fieldName'
>;

export type AutoCompleteComboBoxParams = {
  selectValue: string;
} & Pick<BookingFieldContainerParams, 'subSection' | 'fieldOrder' | 'fieldName' | 'fieldValue'>;

export type CargoFieldActionParams = {
  fillValue: string;
  fieldName: string;
  cargoType: string;
  position: number;
};

export type LocationParams = {
  fieldName: string;
  value: string;
  serviceName: string;
};

export type BookingPartyParams = {
  inputValue: string;
  fieldName: string;
  sectionName: string;
};

export type SinglePickUpParams = {
  ["Supplier's Name"]: string;
  'Contact Person': string;
  Address: string;
  'Postal Code': string;
  Remarks: string;
};

export type AdditionalInfoParams = {
  'ACID No.': string;
  'Importer ID': string;
  'Exporter ID': string;
  'Invoice Ref. No.': string;
  'Booking Shipper Ref. No.': string;
  'Booking Freight Forwarder Ref. No.': string;
  'S/I Shipper Ref. No.': string;
  'S/I Freight Forwarder No.': string;
  'SPLIT OK': string;
  'Special instruction': string;
  'Shipper TAX ID': string;
  'Consignee TAX ID': string;
};

export type CYPickUpParams = {
  'Pick-up Location': string;
  'Pick-up Date & Time': string;
};
