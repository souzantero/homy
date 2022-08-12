import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Page } from "../layout/Page"
import { PageHeader } from "../layout/PageHeader"
import { PageBody } from "../layout/PageBody"
import { FoodForm, Period } from "./FoodForm"
import { useFood } from "../../hooks/useFood"
import { useUpdateFood } from "../../hooks/useUpdateFood"

export function EditFood() {
  const { updateFood, isUpdating } = useUpdateFood()
  const navigate = useNavigate()
  const { foodId } = useParams()

  const [name, setName] = useState<string>('')
  const [expiresIn, setExpiresIn] = useState<number>(0)
  const [period, setPeriod] = useState<Period>(Period.Day)

  const{ food, isLoading } = useFood(foodId || '')

  useEffect(() => {
    if (food) {
      setName(food.name)
      setExpiresIn(food.expiresIn)
    }
  }, [food])
  
  const handleSubmit = async () => {
    if (food) {
      food.name = name
      food.expiresIn = expiresIn * period
      const updatedFood = await updateFood(food)
      if (updatedFood) {
        clear()
        navigate('/foods')
      }
    }
  }

  const clear = () => {
    setName('')
    setExpiresIn(0)
    setPeriod(Period.Day)
  }

  return (
    <Page>
      <PageHeader title="Editar alimento"/>
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
          isDisabled={isLoading || isUpdating}
          isLoading={isLoading || isUpdating}
          buttonText="Salvar"
          buttonLoadingText="Salvando..."
        />
      </PageBody>
    </Page>
  )
}