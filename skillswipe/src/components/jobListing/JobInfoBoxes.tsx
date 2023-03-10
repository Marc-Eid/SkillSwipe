/* eslint-disable react/jsx-no-undef */
import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react'

interface ListingData {
  id: number
  label: string
  text: string
}

const ListingData: ListingData[] = [
  {
    id: 1,
    label: 'Job Type',
    text: 'Internship',
  },
  {
    id: 2,
    label: 'Location',
    text: 'Montreal, QC',
  },
  {
    id: 3,
    label: 'Salary',
    text: '50$/hr',
  },
]

const JobInfoBoxes = ({data}) => {



  return (
    <>
      <Container maxW="5xl" paddingBottom={8}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mt={5} mb={2}>
          {data.map((element) => (
            <Box key={element.id} p={5} boxShadow="md" rounded="36px" borderWidth={2}>
              <Text fontWeight="bold" fontSize="x-large" textAlign={'center'}>
                {element.text}
              </Text>
              <Text textAlign={'center'}>{element.label}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}

export default JobInfoBoxes
