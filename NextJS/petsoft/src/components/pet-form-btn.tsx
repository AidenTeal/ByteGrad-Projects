import React from 'react'
import { Button } from './ui/button'

export default function PetFormBtn({ actionType }: { actionType: string }) {

  return (
      <Button type="submit" className="mt-5 self-end">
        {actionType[0].toUpperCase() + actionType.slice(1)} pet{" "}
      </Button>
  )
}
