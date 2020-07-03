import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm, Controller } from 'react-hook-form'
import { Flex, Box, Text } from '@base'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ChevronLeft from '@components/icons/ChevronLeft'

import styled from '@style'
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
  createMuiTheme,
  Slider,
} from '@material-ui/core'

import MuiAutoComplete from './MuiAutoComplete'

import ButtonsResult from './ButtonsResult'

let renderCount = 0

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

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
  const { handleSubmit, register, reset, control, errors } = useForm({
    defaultValues,
  })
  const [data, setData] = useState(null)
  renderCount += 1

  console.log('errors', errors)

  // const Section = styled(Box)({
  //   borderRadius: '4',
  //   border: '1px solid #f6f6f6',
  //   boxShadow: '0 2px 4px rgba(0, 0, 0, .125)',
  // })

  return (
    <form onSubmit={handleSubmit(data => setData(data))} className="form">
      <Box as="span" className="counter">
        Render Count: {renderCount}
      </Box>
      <Flex className="form-container">
        <Box as="section">
          <Controller
            as={TextField}
            name="TextField"
            control={control}
            placeholder="Enter your search"
          />
        </Box>
        <section>
          <label>MUI Slider</label>
          <Controller
            name="MUI_Slider"
            control={control}
            defaultValue={[0, 10]}
            onChange={([, value]) => value}
            as={<Slider valueLabelDisplay="auto" max={10} step={1} />}
          />
        </section>

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
      </Flex>

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
