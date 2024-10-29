import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
// import Page from '../../app/page'
import HeaderForm from '@/components/HeaderForm'
 
describe('Para o componente HeaderForm, testa se: ', () => {
  
  const propsTeste = {
    "title": 'Titulo teste',
    "description": 'Descrição teste'
  }   
  
  beforeEach(() => {
    render(<HeaderForm {...propsTeste}/>)
  })

  it('Título é renderizado', () => {   

    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })

  it('Descricão é renderizada', () => {   
 
    const description = screen.getByText("Descrição teste")
 
    expect(description).toBeInTheDocument()
  })
})
