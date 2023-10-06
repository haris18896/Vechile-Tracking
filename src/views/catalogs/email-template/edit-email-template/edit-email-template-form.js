import React from 'react'

// ** MUI
import { Grid, TextField } from '@mui/material'

// ** Custom Components

import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'

function EditEmailTemplateForm({ formik }) {
  // console.log('edit email template formik :', formik.values)
  const styles = useCommonStyles()

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid item xs={12} lg={5}>
            <FieldWrapper>
              <TextLabel id='email-template-name' sx={{ marginBottom: '0.25rem' }}>
                Type
              </TextLabel>
              <TextInput
                fullWidth
                id='type'
                name='type'
                type='text'
                placeholder='Enter email type'
                className={styles.TextField}
                {...formik.getFieldProps('type')}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12} lg={5}>
            <FieldWrapper>
              <TextLabel id='email-template-name' sx={{ marginBottom: '0.25rem' }}>
                Subject
              </TextLabel>
              <TextInput
                fullWidth
                id='subject'
                name='subject'
                type='text'
                placeholder='Enter email subject'
                className={styles.TextField}
                {...formik.getFieldProps('subject')}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12} lg={5}>
            <FieldWrapper>
              <TextLabel id='email-template-name' sx={{ marginBottom: '0.25rem' }}>
                Message Body
              </TextLabel>
              <TextField
                fullWidth
                id='message'
                name='message'
                type='text'
                multiline
                rows={4}
                placeholder='Enter email body'
                className={styles.TextArea}
                {...formik.getFieldProps('message')}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </FieldWrapper>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default EditEmailTemplateForm
