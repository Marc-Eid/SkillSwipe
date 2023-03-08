/* eslint-disable react-hooks/rules-of-hooks */
import NavBar from '@/components/NavBar'
import {
  Box,
  Button,
  chakra,
  Container,
  Divider,
  Flex,
  Grid,
  HStack,
  Icon,
  Link,
  Stack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { Fragment, useState } from 'react'
// Here we have used react-icons package for the icons
import { IconType } from 'react-icons'
import { FaRegEye } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { getOpenJobs } from './api/api'

interface JobAttributes {
  id: number
  jobTitle: ''
  companyName: ''
  location: ''
  jobDescription: ''
  salary: ''
  skills: ''
  startDate: ''
  jobType: ''
  coverLetter: ''
  transcript: ''
}

const findJob = () => {
  const [jobListing, setJobListing] = useState<JobAttributes[]>([])

  const viewOpenJobs = async (event: any) => {
    event.preventDefault()

    // Get token from local storage
    const token = localStorage.getItem('jwt')

    try {
      // Call API function to get open jobs
      const response = await getOpenJobs(token)

      // Update state with fetched data
      setJobListing(response.data)

      // Show toast notification
      toast.success('Success on getting jobs!')
    } catch (error) {
      console.error(error)
      toast.error('Error getting jobs')
    }
  }

  return (
    <>
      <NavBar />
      {/* call viewOpenJobs function on page load */}
      <Button onClick={viewOpenJobs}>View Open Jobs</Button>
      <Container maxW="5xl" p={{ base: 10, md: 0 }}>
        <Flex justify="left" mb={3}>
          <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
            Open Jobs
          </chakra.h3>
        </Flex>
        <VStack
          border="1px solid"
          borderColor="gray.400"
          rounded="md"
          overflow="hidden"
          spacing={0}
        >
          {jobListing.map((job, index) => (
            <Fragment key={index}>
              <Grid
                templateRows={{ base: 'auto auto', md: 'auto' }}
                w="100%"
                templateColumns={{ base: 'unset', md: '4fr 2fr 2fr' }}
                p={{ base: 2, sm: 4 }}
                gap={3}
                alignItems="center"
                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
              >
                <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                  <chakra.h3
                    as={Link}
                    href={job.jobTitle}
                    isExternal
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    {job.jobTitle}
                  </chakra.h3>
                  <chakra.p
                    fontWeight="medium"
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    Published: {job.startDate}
                  </chakra.p>
                </Box>
                <HStack
                  spacing={{ base: 0, sm: 3 }}
                  alignItems="center"
                  fontWeight="medium"
                  fontSize={{ base: 'xs', sm: 'sm' }}
                  color={useColorModeValue('gray.600', 'gray.300')}
                >
                  {/* <JobStat icon={FaRegEye} value={job.meta.applications} /> */}
                </HStack>
                <Stack
                  spacing={2}
                  direction="row"
                  fontSize={{ base: 'sm', sm: 'md' }}
                  justifySelf="flex-end"
                  alignItems="center"
                >
                  {['Apply'].map((label, index) => (
                    <JobSettingLink key={index} label={label} />
                  ))}
                </Stack>
              </Grid>
              {jobListing.length - 1 !== index && <Divider m={0} />}
            </Fragment>
          ))}
        </VStack>
      </Container>
    </>
  )
}

// const JobStat = ({ icon, value }: { icon: IconType; value: number }) => {
//   return (
//     <Flex p={1} alignItems="center">
//       <Icon as={icon} w={5} h={5} mr={2} />
//       <chakra.span> {value} </chakra.span>
//     </Flex>
//   )
// }

const JobSettingLink = ({ label }: { label: string }) => {
  return (
    <Button
      as={Link}
      _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
      p={5}
      rounded="100px"
    >
      {label}
    </Button>
  )
}

export default findJob
