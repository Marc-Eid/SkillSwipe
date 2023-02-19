import React, {useState} from "react";
import {
   FormControl,
   FormLabel,
   Input,
   Button,
   Stack,
   Box,
   Heading,
   Text,
   Textarea,
   Spacer,
} from "@chakra-ui/react";
import Awards from "../Forms/Awards";
import {AddIcon, SmallAddIcon} from "@chakra-ui/icons";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {emailValidator} from "@/Util/Validator";

type Award = {
   id?: number,
   title?: string,
   description?: string,
   issue_date?: string,
   issuer?: string,
   url?: string,
}

const AwardsBox = () => {
   const profile = useSelector((state) => state as any);
   const [awardsList, setAwardsList] = useState(profile.auth.awards as Award[]);
   const deleteAward = (id: number) => {
      setAwardsList(awardsList.filter((award: any) => award.id !== id))
   };
   const addAward = () => {
      let award: Award = {};
      setAwardsList(oldArray => [...oldArray, award]);
   }
   const isNew = (award: Award) => {
      return !(award.title && award.description && award.issue_date)
   }
   return (
         <Stack
            as="form"
            p={5}
            mb={5}
            style={{
               flexDirection: "column",
               flexWrap: "wrap",
               justifyContent: "center",
               alignContent: "center",
               alignItems: "center",
               alignSelf: "center",
               WebkitAlignContent: "center",
               WebkitAlignItems: "center",
               WebkitBoxAlign: "center",
               WebkitFlexWrap: "wrap",
               WebkitJustifyContent: "center",
            }}
         >
            <Text
               style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  alignSelf: "flex-start",
               }}
            >
               Awards
               <Button
                  style={{
                     boxShadow: "0 5px 17px 0px rgba(0, 100, 500, 0.3)",
                     border: "3px solid rgba(255, 255, 255, 0.3)",
                     marginLeft: "15px",
                     marginBottom: "5px",
                   }}
                  type="button" 
                  colorScheme={"teal"}
                  borderRadius="100px"
                  onClick={addAward}
               >
                  <AddIcon />
               </Button>
            </Text>

            <div style={{display: "flex", flexDirection: "column-reverse"}}>
               {awardsList && awardsList.map((award: any, index:number) => (
                  <div key={index}>
                     <Awards index={index+1} award={award} deleteAward={deleteAward} isNew={isNew(award)}/>
                  </div>
               ))}
            </div>

         </Stack>
   );
};

export default AwardsBox;