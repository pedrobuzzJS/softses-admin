import Grid from "@/components/GridSystem/Grid/Grid";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Inputs/InputText/Input";
import SInputMask from "@/components/Inputs/InputMask/InputMask";

export default function Page() {
    return (
        <>
            <Modal
                headerLabel={'Cadastro de Pessoa'}
                resizable
                draggable
            >
                <Grid
                    justify={"start"}
                >
                    <Input
                        name={"pessoa.id"}
                        label={"Cod"}
                        placeholder={"Código"}
                        col={1}
                        disabled
                        initialData={'1'}
                    />
                    <Input
                        name={"pessoa.person.name"}
                        label={"Nome"}
                        placeholder={"Nome"}
                        col={4}
                        initialData={"Pedro Artur"}
                    />
                    <Input
                        name={"pessoa.person.lastName"}
                        label={"Sobrenome"}
                        placeholder={"Sobrenome"}
                        col={4}
                        initialData={"Buzzi Pereira"}
                    />
                    <SInputMask
                        name={"pessoa.cpf"}
                        label={"CPF"}
                        placeholder={"___.___.___-__"}
                        col={3}
                        mask={"999.999.999-99"}
                        initialData={"10578164930"}
                    />
                </Grid>
            </Modal>
        </>
    );
}