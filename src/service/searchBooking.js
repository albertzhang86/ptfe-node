import axios from 'axios';
import { pick, omit } from 'lodash';
import uuid
import config from '../config';

const eligibilityAPI = config.api.eligibility;

const customerTypesMap = {
  ADULT: 'A',
  CHILD: 'C',
  INFANT: 'IN'
};

export const searchBooking = async (pnr, lastName, departurePort) => {

  const { pnr, surname, departurePort, checkinTime } = request;
  const { path, headers, timeout } = eligibilityConfig.v2;
  const config = {
    headers:{
      Accept: 'application/vnd.checkin.eligibility.v2+json',
      'Content-Type': 'application/vnd.checkin.eligibility.v2+json',
      Channel: 'OLCI',
      userSessionID: uuid.v4()
    }
  };
  return await axios.post(eligibilityAPI, { pnr, lastName, departurePort }, config);
}


const reshapeResponseIfUsing = (isInternational) => (response) => {
  if (!isInternational) {
    return response;
  }

  const { config, headers, request, status, statusText, data } = response;
  const { customers, flights, products, tripType } = data;

  return {
    config,
    headers,
    request,
    status,
    statusText,
    data: {
      checkInStatus: data.checkInStatus,
      customers: getCustomers(customers, flights, products, tripType)
    }
  };
};

const getCustomers = (customers, flights, products, tripType) =>
customers.map(customer => ({
  customerType: customerTypesMap[customer.type],
  title: customer.title,
  passport: extractPassport(customer.passport),
  products: extractProducts(flights, products, customer.id, tripType),
  customerId: customer.id,
  givenName: customer.givenName,
  surname: customer.surname,
  status: customer.status,
  daysOfStay: customer.daysOfStay,
  infantId: customer.infantId
}));

const extractPassport = ({ number, nationality, gender, expiryDate, issuingCountry, dateOfBirth }) => (
  number && {
    dateOfBirth,
    gender,
    passportNumber: number,
    nationality: {
      threeLetterCode: nationality
    },
    expiryDate,
    issuingCountry: {
      threeLetterCode: issuingCountry
    }
  });

  const extractProducts = (flights, products, customerId, tripType) => flights.map((flight) => {
    const {
      id,
      number,
      codeShareFlightNumber,
      onlineCheckinClosed,
      duration,
      departure,
      arrival,
      companyIdentifier: { marketingCarrier, operatingCarrier },
      nextSteps
    } = flight;

    const {
      productId, transitDuration, segment, status, regulatoryRequirements, seatDetails
    } = products.find(product => product.customerId === customerId && product.flightId === id) || {};

    return {
      productId,
      flightNumber: number.toString(),
      codeShareFlightNumber,
      onlineCheckinClosed,
      departureCountry: departure.country,
      arrivalCountry: arrival.country,
      productType: tripType,
      departure: {
        airportCode: departure.code,
        airportName: departure.name,
        departureDate: departure.date,
        departureTime: departure.time
      },
      arrival: {
        airportCode: arrival.code,
        airportName: arrival.name,
        arrivalDate: arrival.date,
        arrivalTime: arrival.time
      },
      legs: [
        {
          departurePort: departure.code,
          arrivalPort: arrival.code,
          departureAirportName: departure.name,
          arrivalAirportName: arrival.name,
          departureTerminal: departure.terminal,
          arrivalTerminal: arrival.terminal,
          departureTime: moment(`${departure.date}${departure.time}`, 'YYYYMMDDHHmm').format('MMDDYYYYHHmmss'),
          arrivalTime: moment(`${arrival.date}${arrival.time}`, 'YYYYMMDDHHmm').format('MMDDYYYYHHmmss'),
          transitDuration
        }
      ],
      status,
      flightDuration: duration,
      segmentType: segment,
      ...getBoadingPassInfo(products, customerId, id),
      companyIdentifier: {
        marketingCarrierCode: marketingCarrier.code,
        marketingCarrierName: marketingCarrier.name || '',
        operatingCarrierCode: operatingCarrier.code,
        operatingCarrierName: operatingCarrier.name || ''
      },
      nextSteps,
      regulatoryRequirements,
      seatDetails
    };
  });

  const getBoadingPassInfo = (products, customerId, flightId) => {
    const { boardingPassInfo } = products.find(product => product.customerId === customerId && product.flightId === flightId) || { boardingPassInfo: {} };

    return {
      digitalBpAccepted: boardingPassInfo.digitalAccepted,
      printBoardingPass: boardingPassInfo.printedAccepted,
      printBoardingPassMessage: boardingPassInfo.message
    };
  };
