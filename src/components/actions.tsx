import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ActionType, ROUTES, SYMBOL, actionButtonStyles } from '../constants'
import { useManage } from '../hooks/useManage'
import { useExtension } from '../states/extension'
import { useRegistration } from '../states/registration'
import { capitalizeFirstLetter, formatAddress } from '../utils'

interface ActionsProps {
  operatorId: string
}

export const Actions: React.FC<ActionsProps> = ({ operatorId }) => {
  const finalRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const stakingConstants = useExtension((state) => state.stakingConstants)
  const [actionSelected, setActionSelected] = useState<ActionType | null>(null)
  const isErrorsField = useRegistration((state) => state.isErrorsField)
  const {
    addFundsAmount,
    withdrawAmount,
    handleChangeOperatorId,
    handleChangeAmount,
    handleMaxAmountToAddFunds,
    handleMaxAmountToWithdraw,
    handleSubmit
  } = useManage()

  const operator = useMemo(
    () => stakingConstants.operators.find((operator) => operator.operatorId === operatorId),
    [operatorId, stakingConstants.operators]
  )

  const handleClickOnAction = useCallback(
    (action: ActionType) => {
      handleChangeOperatorId(action, operatorId)
      setActionSelected(action)
      onOpen()
    },
    [handleChangeOperatorId, onOpen, operatorId]
  )

  const handleCloseModal = useCallback(() => {
    setActionSelected(null)
    onClose()
  }, [onClose])

  const handleClickSubmit = useCallback(() => {
    actionSelected !== null && handleSubmit(actionSelected)
    onClose()
  }, [actionSelected, handleSubmit, onClose])

  return (
    <>
      <Menu>
        <MenuButton {...actionButtonStyles} as={Button} rightIcon={<ChevronDownIcon pl='2' />}>
          Action
        </MenuButton>
        <MenuList>
          {Object.values(ActionType).map((action) => (
            <MenuItem
              key={action}
              onClick={() => handleClickOnAction(action)}
              _hover={{
                bgGradient: 'linear(to-r, #A28CD2, #F4ABFD)'
              }}>
              <Text ml='2'>{capitalizeFirstLetter(action)}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {actionSelected != null && capitalizeFirstLetter(actionSelected)} on Operator Id #{operatorId}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <VStack>
                <Text>Operator Account {operator && operator.operatorOwner}</Text>
                <Text>
                  Signing Key{' '}
                  {operator && (
                    <Link href={`${ROUTES.OPERATOR_STATS}/${operator.operatorDetail.signingKey}`}>
                      {formatAddress(operator.operatorDetail.signingKey)}
                    </Link>
                  )}
                </Text>
                {actionSelected === ActionType.Deregister && (
                  <Text>Do you really want to de-register as operator?</Text>
                )}
                {actionSelected === ActionType.AddFunds && (
                  <FormControl isInvalid={isErrorsField['amount']}>
                    <InputGroup size='md' mt='4' w='20vw'>
                      <Input
                        name='amount'
                        borderColor='brand.500'
                        border='1px'
                        placeholder={`Amount, ${SYMBOL}`}
                        value={addFundsAmount.formattedAmount}
                        onChange={(e) => handleChangeAmount(ActionType.AddFunds, e)}
                        _placeholder={{ color: '#7D7D7D' }}
                      />
                      <InputRightElement>
                        <Button m={1} onClick={handleMaxAmountToAddFunds} size='sm'>
                          Max
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {isErrorsField['amount'] ? (
                      <FormErrorMessage h='10'>The amount you enter is not valid</FormErrorMessage>
                    ) : (
                      <FormHelperText h='10'></FormHelperText>
                    )}
                  </FormControl>
                )}
                {actionSelected === ActionType.Withdraw && (
                  <FormControl isInvalid={isErrorsField['amount']}>
                    <InputGroup size='md' mt='4' w='20vw'>
                      <Input
                        name='amount'
                        borderColor='brand.500'
                        border='1px'
                        placeholder={`Amount, ${SYMBOL}`}
                        value={withdrawAmount.formattedAmount}
                        onChange={(e) => handleChangeAmount(ActionType.Withdraw, e)}
                        _placeholder={{ color: '#7D7D7D' }}
                      />
                      <InputRightElement>
                        <Button m={1} onClick={handleMaxAmountToWithdraw} size='sm'>
                          Max
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {isErrorsField['amount'] ? (
                      <FormErrorMessage h='10'>The amount you enter is not valid</FormErrorMessage>
                    ) : (
                      <FormHelperText h='10'></FormHelperText>
                    )}
                  </FormControl>
                )}
              </VStack>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' colorScheme='brand' mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            <Button colorScheme='brand' mr={3} onClick={handleClickSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}