import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const invoices = [
    {
      invoice: "Mathematics",
      holidayAssignment: "5/5",
      firstTest: "10/10",
      secondTest: "9/10",
      examination: "49/50"
    },
    {
      invoice: "NEIE",
      holidayAssignment: "5/5",
      firstTest: "9/10",
      secondTest: "9/10",
      examination: "47/50"
    },
    {
      invoice: "Chemistry",
      holidayAssignment: "5/5",
      firstTest: "10/10",
      secondTest: "10/10",
      examination: "50/50"
    },
    {
      invoice: "Physics",
      holidayAssignment: "3/5",
      firstTest: "9/10",
      secondTest: "9/10",
      examination: "50/50"
    },
    {
      invoice: "Cosmetology",
      holidayAssignment: "5/5",
      firstTest: "10/10",
      secondTest: "9/10",
      examination: "49/50"
    },
    {
      invoice: "Biology",
      holidayAssignment: "5/5",
      firstTest: "10/10",
      secondTest: "9/10",
      examination: "49/50"
    },
    {
      invoice: "Essentials in Writing",
      holidayAssignment: "5/5",
      firstTest: "10/10",
      secondTest: "9/10",
      examination: "49/50"
    },
    {
      invoice: "Vocabulary Building",
      holidayAssignment: "5/5",
      firstTest: "10/10",
      secondTest: "9/10",
      examination: "49/50"
    },
    {
      invoice: "Computer Science",
      holidayAssignment: "5/5",
      firstTest: "10/10",
      secondTest: "9/10",
      examination: "49/50"
    },
    {
      invoice: "Ecnomics",
      holidayAssignment: "5/5",
      firstTest: "10/10",
      secondTest: "9/10",
      examination: "49/50"
    },
    {
      invoice: "Photography",
      holidayAssignment: "5/5",
      firstTest: "10/10",
      secondTest: "9/10",
      examination: "49/50"
    },
  ]
  
  export function GradesTable() {
    return (
      <Table>
        <TableCaption>A list of your recent grades.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Subject</TableHead>
            <TableHead>Holiday Assignment</TableHead>
            <TableHead>First Test</TableHead>
            <TableHead>Second Test</TableHead>
            <TableHead>Examination</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium text-left">{invoice.invoice}</TableCell>
              <TableCell>{invoice.holidayAssignment}</TableCell>
              <TableCell>{invoice.firstTest}</TableCell>
              <TableCell>{invoice.secondTest}</TableCell>
              <TableCell>{invoice.examination}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="">283/300</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  