import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getDeck } from "../firebase/firebase"

const Deck = () => {
  const { id } = useParams()

  const [deck, set_deck] = useState({})

  useEffect(() => {
    getDeck(id).then((data) => {
      console.log(data)
      set_deck(data)
    })
  }, [])

  return <></>
}

export default Deck
