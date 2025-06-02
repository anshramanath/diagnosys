import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 2,
  },
  value: {
    marginBottom: 4,
  },
  row: {
    marginBottom: 8,
  },
})

export default function HealthSummaryPDF({ data }: { data: Record<string, string> }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Health Summary</Text>

        {Object.entries(data).map(([key, value]) => (
          <View style={styles.row} key={key}>
            <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1").toLowerCase()}:</Text>
            <Text style={styles.value}>{value || "—"}</Text>
          </View>
        ))}
      </Page>
    </Document>
  )
}