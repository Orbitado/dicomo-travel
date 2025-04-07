import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useStore } from "@/store";
import { format } from "date-fns";

// Definir colores de marca
const colors = {
  primary: "#1976d2", // Azul
  secondary: "#f5f5f5", // Gris claro
  accent: "#ff6d00", // Naranja acento
  text: "#333333",
  lightText: "#666666",
  border: "#dddddd",
};

// Definir estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 15,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: `2px solid ${colors.primary}`,
  },
  headerLogo: {
    width: 120,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  section: {
    margin: 5,
    padding: 5,
    borderRadius: 3,
    borderLeft: `3px solid ${colors.primary}`,
    backgroundColor: colors.secondary,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    marginBottom: 5,
    color: colors.primary,
    fontWeight: "bold",
    paddingBottom: 3,
    borderBottom: `1px solid ${colors.border}`,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: "40%",
    fontSize: 9,
    color: colors.lightText,
  },
  value: {
    width: "60%",
    fontSize: 9,
    color: colors.text,
    fontWeight: "bold",
  },
  customerSection: {
    flexDirection: "row",
    marginBottom: 10,
  },
  customerColumn: {
    flex: 1,
    padding: 5,
  },
  multiColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  total: {
    marginTop: 10,
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  totalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "right",
  },
  footer: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
    fontSize: 8,
    color: colors.lightText,
    textAlign: "center",
    borderTop: `1px solid ${colors.border}`,
    paddingTop: 5,
  },
  disclaimer: {
    fontSize: 7,
    color: colors.lightText,
    marginTop: 2,
  },
  dateRange: {
    fontSize: 11,
    color: colors.accent,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
});

const QuoteDocument = () => {
  const {
    // Customer data
    clientName,
    contactPerson,
    phone,
    email,
    // Itinerary data
    origin: itineraryOrigin,
    destination: itineraryDestination,
    dates,
    rooms,
    adults,
    children,
    // Flight data
    origin: flightOrigin,
    destination: flightDestination,
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
    maxChildren,
    // Prices data
    serviceDescription,
    quantity,
    unitPrice,
    taxesIncluded,
    subtotal,
    totalQuote,
  } = useStore();

  // Formatear fechas para mostrar
  const formatDateRange = () => {
    if (!dates || !dates.from) return "Fechas no especificadas";

    const fromDate = format(dates.from, "dd/MM/yyyy");
    const toDate = dates.to ? format(dates.to, "dd/MM/yyyy") : fromDate;

    return `${fromDate} - ${toDate}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado con logo */}
        <View style={styles.header}>
          <Image src="/logo.png" style={styles.headerLogo} />
          <Text style={styles.headerTitle}>Itinerario de Viaje</Text>
        </View>

        {/* Banner de rango de fechas */}
        <View style={styles.dateRange}>
          <Text>{formatDateRange()}</Text>
        </View>

        {/* Información del cliente e itinerario */}
        <View style={styles.customerSection}>
          <View style={styles.customerColumn}>
            <Text style={styles.sectionTitle}>Información del Cliente</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Cliente:</Text>
              <Text style={styles.value}>{clientName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Contacto:</Text>
              <Text style={styles.value}>{contactPerson}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Teléfono:</Text>
              <Text style={styles.value}>{phone}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
          </View>

          <View style={styles.customerColumn}>
            <Text style={styles.sectionTitle}>Resumen del Itinerario</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Origen:</Text>
              <Text style={styles.value}>{itineraryOrigin}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Destino:</Text>
              <Text style={styles.value}>{itineraryDestination}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Habitaciones:</Text>
              <Text style={styles.value}>{rooms}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Huéspedes:</Text>
              <Text style={styles.value}>
                {adults} Adultos, {children} Niños
              </Text>
            </View>
          </View>
        </View>

        {/* Secciones de vuelo y alojamiento en 2 columnas */}
        <View style={styles.multiColumn}>
          {/* Información de Vuelo */}
          <View style={[styles.section, styles.column]}>
            <Text style={styles.sectionTitle}>Información de Vuelo</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Desde - Hasta:</Text>
              <Text style={styles.value}>
                {flightOrigin} - {flightDestination}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Aerolínea:</Text>
              <Text style={styles.value}>{airline}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Salida:</Text>
              <Text style={styles.value}>
                {format(departureDate, "dd/MM/yyyy")}{" "}
                {format(departureTime, "HH:mm")}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Llegada:</Text>
              <Text style={styles.value}>
                {format(arrivalDate, "dd/MM/yyyy")}{" "}
                {format(arrivalTime, "HH:mm")}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Equipaje de mano:</Text>
              <Text style={styles.value}>
                {includesHandLuggage ? "Incluido" : "No incluido"}
              </Text>
            </View>
          </View>

          {/* Detalles del Alojamiento */}
          <View style={[styles.section, styles.column]}>
            <Text style={styles.sectionTitle}>Detalles del Alojamiento</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Hotel:</Text>
              <Text style={styles.value}>{hotelName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Ubicación:</Text>
              <Text style={styles.value}>{location}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Tipo de Habitación:</Text>
              <Text style={styles.value}>{roomType}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Régimen:</Text>
              <Text style={styles.value}>{mealPlan}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Huéspedes:</Text>
              <Text style={styles.value}>
                {maxAdults} Adultos, {maxChildren} Niños
              </Text>
            </View>
          </View>
        </View>

        {/* Detalles de Precios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles de Precios</Text>

          <View style={styles.multiColumn}>
            <View style={styles.column}>
              <View style={styles.row}>
                <Text style={styles.label}>Servicio:</Text>
                <Text style={styles.value}>{serviceDescription}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Cantidad:</Text>
                <Text style={styles.value}>{quantity}</Text>
              </View>
            </View>

            <View style={styles.column}>
              <View style={styles.row}>
                <Text style={styles.label}>Precio Unitario:</Text>
                <Text style={styles.value}>${unitPrice}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Subtotal:</Text>
                <Text style={styles.value}>${subtotal}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Impuestos Incluidos:</Text>
                <Text style={styles.value}>{taxesIncluded ? "Sí" : "No"}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Precio Total */}
        <View style={styles.total}>
          <Text style={styles.totalText}>Precio Total: USD ${totalQuote}</Text>
        </View>

        {/* Pie de página con aviso legal */}
        <View style={styles.footer}>
          <Text>
            Generado el {format(new Date(), "dd/MM/yyyy")} - Dicomo Travel
          </Text>
          <Text style={styles.disclaimer}>
            Esta cotización es válida por 7 días desde la fecha de emisión y
            está sujeta a disponibilidad.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default QuoteDocument;
