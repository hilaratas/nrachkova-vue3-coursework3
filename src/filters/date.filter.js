export default function dateFilter ( date ) {
  return new Intl.DateTimeFormat().format(date)
}