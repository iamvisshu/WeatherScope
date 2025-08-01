export interface Country {
  name: string;
  cities: string[];
}

export const countries: Country[] = [
  { name: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
  { name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'] },
  { name: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham', 'Glasgow'] },
  { name: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'] },
  { name: 'Japan', cities: ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo'] },
  { name: 'India', cities: ['Agra', 'Ahmedabad', 'Bangalore', 'Bhopal', 'Chennai', 'Delhi', 'Gurugram', 'Hyderabad', 'Indore', 'Jaipur', 'Jammu', 'Kanpur', 'Kolkata', 'Leh', 'Lucknow', 'Ludhiana', 'Manali', 'Mumbai', 'Nagpur', 'Noida', 'Patna', 'Pune', 'Shimla', 'Srinagar', 'Surat', 'Varanasi', 'Visakhapatnam'] },
];
