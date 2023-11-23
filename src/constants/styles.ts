export const pageStyles = {
  minW: '60vw',
  maxW: '1600px',
  mt: '10',
  p: '4',
  border: '0'
}

export const headingStyles = {
  page: {
    size: 'lg',
    fontWeight: '700',
    fontSize: '30px',
    ml: '2',
    color: '#000000'
  },
  paragraph: {
    size: 'lg',
    fontWeight: '500',
    fontSize: '40px',
    color: '#5B5252'
  },
  paragraphExtra: {
    size: 'lg',
    fontWeight: '500',
    fontSize: '24px',
    mt: '16px',
    color: '#5B5252'
  }
}

export const textStyles = {
  heading: {
    fontWeight: '500',
    fontSize: '26px',
    color: '#5B5252'
  },
  value: {
    fontWeight: '700',
    fontSize: '28px',
    color: '#5B5252'
  },
  link: {
    textDecoration: 'underline',
    color: '#4524C1',
    mt: '4'
  },
  text: {
    color: '#5B5252'
  }
}

export const tableStyles = {
  borderColor: '#B9B9B9',
  border: '1',
  variant: 'striped',
  size: 'sm'
}

export const tHeadStyles = {
  bg: 'rgba(0, 0, 0, 0.06)'
}

export const buttonStyles = {
  bgGradient: 'linear(to-r, #846F87, #4D397A)',
  color: '#FFFFFF',
  borderRadius: '0',
  mt: '8',
  pl: '16px',
  pr: '16px',
  pt: '8px',
  pb: '7px',
  w: '228px',
  _hover: {
    bgGradient: 'linear(to-r, #4D397A, #846F87)'
  }
}

export const connectWalletButtonStyles = {
  ...buttonStyles,
  mt: 0,
  bgGradient: 'linear(to-r, #EA71F9, #4D397A)',
  minW: '150px',
  _hover: {
    bgGradient: 'linear(to-r, #4D397A, #EA71F9)'
  },
  _active: {
    bgGradient: 'linear(to-r, #4D397A, #EA71F9)'
  }
}

export const actionButtonStyles = connectWalletButtonStyles
