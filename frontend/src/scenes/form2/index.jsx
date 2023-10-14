import { Box, Button, TextField } from "@mui/material";
import { Formik, Field  } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";

const DealsForm = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwHK2tLx9eAHBbGpFyPBxfKg9x82BezzoV5O6aoYa_4LqQPTulEfJ5mH18pz1SuAIhRAQ/exec";

    async function handleFormSubmitTwo(values, { resetForm }) {
    // test
    console.log("hi");
    console.log(values);
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams(values),
      });

      // Reset the form after successful submission
      resetForm();

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
  onSubmit={(values, { resetForm }) => handleFormSubmitTwo(values, { resetForm })}
  initialValues={initialValues}
  validationSchema={checkoutSchema}
  name="submit-to-google-form2"
>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Customer Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.customerName}
                name="customerName"
                error={!!touched.customerName && !!errors.customerName}
                helperText={touched.customerName && errors.customerName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Amount Of Coutr"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.coutrAmount}
                name="coutrAmount"
                error={!!touched.coutrAmount && !!errors.coutrAmount}
                helperText={touched.coutrAmount && errors.couterAmount}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="No. Of Deals"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.noOfDeals}
                name="noOfDeals"
                error={!!touched.noOfDeals && !!errors.noOfDeals}
                helperText={touched.noOfDeals && errors.noOfDeals}
                sx={{ gridColumn: "span 4" }}
              />
         
            <TextField
                fullWidth
                variant="filled"
                type="date"
                label=" "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 4" }}
              />
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Deals
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  customerName: "",
  companyName: "",
  coutrAmount: "",
  noOfDeals: "",
  date: ""
  };

export default DealsForm;
