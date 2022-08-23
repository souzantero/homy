import { useState } from 'react'
import { useAddFood } from '../../hooks/useAddFood'
import { useNavigate } from 'react-router-dom'
import { Page } from '../layout/Page'
import { PageHeader } from '../layout/PageHeader'
import { PageBody } from '../layout/PageBody'
import { FoodForm, Period } from './FoodForm'

export function AddFood() {
  const { addFood, isAdding } = useAddFood()
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [expiresIn, setExpiresIn] = useState<number>(0)
  const [period, setPeriod] = useState<Period>(Period.Day)

  const handleSubmit = async () => {
    const params = { name, expiresIn: expiresIn * period }
    const createdFood = await addFood(params)
    if (createdFood) {
      clear()
      navigate('/foods')
    }
  }

  const clear = () => {
    setName('')
    setExpiresIn(0)
    setPeriod(Period.Day)
  }

  return (
    <Page>
      <PageHeader title="Adicionar alimento" />
      <PageBody>
        <FoodForm
          value={{
            name,
            expiresIn,
            period
          }}
          onChange={(data) => {
            setName(data.name)
            setExpiresIn(data.expiresIn)
            setPeriod(data.period)
          }}
          onSubmit={handleSubmit}
          isDisabled={isAdding}
          isLoading={isAdding}
        />
      </PageBody>
    </Page>
  )
}
