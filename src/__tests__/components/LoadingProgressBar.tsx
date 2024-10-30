import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LoadingProgressBar from '@/components/forms/LoadingProgressBar'
 
describe('Para o componente LoadingProgressBar, testa se: ', () => {
  
  const LoadingProgressBarProps = {
    isLoading: true,
    progress: 30
  } 
  
  beforeEach(() => {
    render(<LoadingProgressBar {...LoadingProgressBarProps}/>)
  })

  it('Barra de progresso é renderizada', () => {   

    const loadingBar = screen.getByTestId('loading-progress-bar')
 
    expect(loadingBar).toBeInTheDocument()
  })
})
