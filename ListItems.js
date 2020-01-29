import React from 'react';
import { Link } from 'react-router-dom';

const items = [
    { rota: "/", icone: (<i className="fas fa-copy" />), titulo: "Pedidos" },
    { rota: "/clientes", icone: (<i className="fas fa-users" />), titulo: "Clientes" },
    { rota: "/categorias", icone: (<i className="fas fa-clone" />), titulo: "Categorias" },
    { rota: "/produtos", icone: (<i className="fas fa-boxes" />), titulo: "Produtos" },
    { rota: "/configuracoes", icone: (<i className="fas fa-cog" />), titulo: "Configurações" },
    { rota: "/perfil", icone: (<i className="fas fa-user" />), titulo: "Perfil", children: [ 
        { rota: "/reiniciar-senha", icone: (<i className="fas fa-arrow-up" />), titulo: "Resetar senha" } 
    ] },
]

class ListItemsItem extends React.Component {
    state = { childrenOpen: false }

    render(){
        const { item, history, open } = this.props;
        const {children} = item;
        const {childrenOpen} = this.state;
        const localAtual = history.location.pathname;        
        return (
            <div>
                <Link to={item.rota}>
                    <div className={`menu-item ${ localAtual === item.rota ? "menu-item-active" : "" } flex horizontal`}>
                        <div className="flex-2 flex flex-center">
                            { item.icone }
                        </div>
                        { open && (
                            <div className="flex-4 flex flex-start">
                                <span>{item.titulo}</span>
                            </div>
                        )}
                        { children && (
                            <Link to="#" className="flex-1 flex flex-center">
                                <div className="flex-1 flex flex-center" onClick={() => this.setState({ childrenOpen: !this.state.childrenOpen })} >
                                    <i className="fas fa-arrow-down"></i>
                                </div>
                            </Link>
                        )}
                    </div>
                </Link>
                { children && childrenOpen && (
                    <div>
                        {children.map((child, idx) => (
                            <Link to={child.rota}>
                                <div className={`menu-item ${ localAtual === child.rota ? "menu-item-active" : "" } flex horizontal`}>
                                    <div className="flex-2 flex flex-center">
                                        { child.icone }
                                    </div>
                                    { open && (
                                        <div className="flex-4 flex flex-start">
                                            <span>{child.titulo}</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}

const ListItems = ({ open, history }) => {
    return (
        <div className="items-wrapper">
            { items.map((item, idx) => <ListItemsItem key={idx} open={open} history={history} item={item} />) }
        </div>
    );
}

export default ListItems;