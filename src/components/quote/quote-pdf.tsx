import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { useStore } from "@/store";
import { format } from "date-fns";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: "1px solid #eee",
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
    backgroundColor: "#f5f5f5",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    width: "40%",
    fontSize: 12,
    color: "#666",
  },
  value: {
    width: "60%",
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
  },
  total: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  totalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: "#999",
    textAlign: "center",
  },
});

const QuoteDocument = () => {
  const {
    // Flight data
    origin,
    destination,
    airline,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    includesHandLuggage,
    // Hosting data
    hotelName,
    location,
    mealPlan,
    roomType,
    maxAdults,
    // Prices data
    totalQuote,
    taxesIncluded,
  } = useStore();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Travel Itinerary</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flight Information</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>From - To:</Text>
            <Text style={styles.value}>{origin} - {destination}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Airline:</Text>
            <Text style={styles.value}>{airline}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Departure:</Text>
            <Text style={styles.value}>
              {format(departureDate, "dd/MM/yyyy")} {format(departureTime, "HH:mm")}
            </Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Arrival:</Text>
            <Text style={styles.value}>
              {format(arrivalDate, "dd/MM/yyyy")} {format(arrivalTime, "HH:mm")}
            </Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Hand Luggage:</Text>
            <Text style={styles.value}>{includesHandLuggage ? "Included" : "Not included"}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accommodation Details</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Hotel:</Text>
            <Text style={styles.value}>{hotelName}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{location}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Room Type:</Text>
            <Text style={styles.value}>{roomType}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Meal Plan:</Text>
            <Text style={styles.value}>{mealPlan}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Guests:</Text>
            <Text style={styles.value}>{maxAdults} Adults</Text>
          </View>
        </View>
        
        <View style={styles.total}>
          <Text style={styles.totalText}>
            Total Price: USD ${totalQuote}
            {taxesIncluded ? " (Taxes Included)" : " (Taxes Not Included)"}
          </Text>
        </View>
        
        <Text style={styles.footer}>
          Generated on {format(new Date(), "dd/MM/yyyy")} - Dicomo Travel
        </Text>
      </Page>
    </Document>
  );
};

export default QuoteDocument; 