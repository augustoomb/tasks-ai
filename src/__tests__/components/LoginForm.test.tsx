import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "@/components/LoginForm";
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

// Criação do mock de useRouter 
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

// Mock de toast para evitar erros e conflitos
jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));


describe("LoginForm Component", () => {
  
  it("deve renderizar o input de e-mail e senha", () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/fulano@email.com/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("********");
    expect(passwordInput).toBeInTheDocument();
  });

  it("deve renderizar o botão com o texto 'Entrar'", () => {
    render(<LoginForm />);

    const btnEntrar = screen.getByRole("button", { name: "Entrar" });
    expect(btnEntrar).toBeInTheDocument();
  }); 


  it("deve renderizar o texto 'Esqueci minha senha'", () => {
    render(<LoginForm />);

    const registerLink = screen.getByText(/Esqueci minha senha/i);
    expect(registerLink).toBeInTheDocument();
  });

  it("deve renderizar o texto Possui o texto 'Cadastre-se'", () => {
    render(<LoginForm />);

    const registerLink = screen.getByText(/cadastre-se/i);
    expect(registerLink).toBeInTheDocument();
  });

  it("testa algo", () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/fulano@email.com/i);
    const passwordInput = screen.getByPlaceholderText("********");
    const btnEntrar = screen.getByRole("button", { name: "Entrar" });

    userEvent.type(emailInput, "fulano@email.com");
    userEvent.type(passwordInput, "123456");
    userEvent.click(btnEntrar);

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });

  // it('deve realizar login com sucesso', async () => {
    
  // });

});
