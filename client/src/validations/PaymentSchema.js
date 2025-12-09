import * as yup from 'yup';


export const paymentSchema = yup.object({

  address: yup.string().required('Address is required'),

  city: yup.string().required('City is required'),

  cardNumber: yup.string()
    .required('Card number is required')
    .matches(/^\d{16}$/, 'Must be a valid 16-digit card number'),

  expiryDate: yup.string()
    .required('Expiry date is required'),

  cvv: yup.string()
    .required('CVV is required')
    .matches(/^\d{3,4}$/, 'Must be a valid CVV (3-4 digits)'),
});



export const validZipData = [
  { zip: '112', city: 'Ruwi', tax: 0.75, shipping: 2.50 }, 
  { zip: '121', city: 'Al Seeb', tax: 0.05, shipping: 3.00 },
  { zip: '133', city: 'Al Khuwair', tax: 0.35, shipping: 2.00 },
  { zip: '125', city: 'Muttrah', tax: 0.65, shipping: 2.25 },
  { zip: '119', city: 'Al Amarat', tax: 0.25, shipping: 3.50 },
  { zip: '611', city: 'Nizwa', tax: 0.95, shipping: 5.00 },
];