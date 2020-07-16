import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Flex, Box, Text } from '@base'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ChevronLeft from '@components/icons/ChevronLeft'

import styled, { themeGet, layout, space } from '@style'
// import ReactSelect from 'react-select'
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Switch,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
} from '@material-ui/core'

import MuiAutoComplete from './MuiAutoComplete'

import ButtonsResult from './ButtonsResult'

const defaultValues = {
  Native: '',
  TextField: '',
  Select: '',
  // ReactSelect: { value: 'vanilla', label: 'Vanilla' },
  Checkbox: false,
  switch: false,
  country: null,
  RadioGroup: '',
}

const ControlledForm = props => {
  const { handleSubmit, reset, control, errors } = useForm({
    defaultValues,
  })
  const [data, setData] = useState(null)

  console.log('errors', errors)

  const FormField = styled(Box)`
    // margin-bottom: ${themeGet('space.unit.margin', '20px')};

  `

  return (
    <form onSubmit={handleSubmit(data => setData(data))} className="form">
      <Box
        className="form-container"
        css={`
          section + section {
            margin-top: ${themeGet('space.unit.large', '20px')};
          }
        `}
      >
        <FormField
          as="section"
          className="search-form-field search-form-field__text-search"
          width={[1, null, 1 / 2]}
        >
          <Controller
            as={TextField}
            name="text"
            control={control}
            placeholder="Enter your search"
            fullWidth
          />
        </FormField>
        <FormField
          as="section"
          className="search-form-field search-form-field__difficulty"
          width={[1, null, 1 / 2]}
        >
          <Text as="label">Cooking time</Text>
          <Controller
            name="difficulty"
            control={control}
            defaultValue={[10, 60]}
            onChange={([, value]) => value}
            as={
              <Slider
                valueLabelDisplay="auto"
                max={60}
                min={10}
                step={10}
                marks
              />
            }
          />
        </FormField>

        <section>
          <label>MUI Select</label>
          <Controller
            as={
              <Select>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            }
            name="Select"
            control={control}
          />
        </section>
        <ButtonsResult {...{ data, reset, defaultValues }} />
      </Box>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={
            <ChevronLeft maxWidth="15px" styles="transform: rotate(-90deg);" />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Text as="p">Advanced controls</Text>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Flex flexWrap="wrap">
            <Box as="section" width={['50%']} mb={[4]}>
              <label>MUI Switch</label>
              <Controller
                as={Switch}
                type="checkbox"
                name="switch"
                control={control}
              />
            </Box>
            <Box as="section" width={['50%']} mb={[4]}>
              <label>MUI autocomplete</label>
              <MuiAutoComplete control={control} />
            </Box>
            <Box as="section" width={['50%']} mb={[4]}>
              <label>MUI Checkbox</label>
              <Controller
                as={Checkbox}
                name="Checkbox"
                type="checkbox"
                control={control}
                rules={{ required: true }}
              />
            </Box>
            <Box as="section" width={['50%']} mb={[4]}>
              <label>Radio Group</label>
              <Controller
                as={
                  <RadioGroup aria-label="gender">
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                }
                name="RadioGroup"
                control={control}
              />
            </Box>
          </Flex>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </form>
  )
}

export default ControlledForm

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]
