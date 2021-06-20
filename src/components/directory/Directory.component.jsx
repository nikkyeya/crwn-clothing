import React from 'react'
import MenuItem from '../menuItem/MenuItem.component'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectDirectorySections } from '../../redux/directory/Directory.selectors'
import './Directory.styles.scss'

const Directory = ({ sections }) => (
  <div className='directory-menu'>
    {sections.map(({ id, ...sectionProps }) => (
      <MenuItem key={id} {...sectionProps} />
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
})

export default connect(mapStateToProps)(Directory)
