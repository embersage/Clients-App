import Table from '../Table';
import TableRow from '../TableRow';
import styles from './PresentationBlock.module.scss';

const values = ['id', 'name', 'description'];

const PresentationsBlock = (props) => {
  const { presentations } = props;
  return (
    <>
      {presentations && presentations.length ? (
        <Table headers={['id', 'Название', 'Описание']} caption={'Презентации'}>
          {presentations.map((item) => (
            <TableRow key={item.id} values={values}>
              {item}
            </TableRow>
          ))}
        </Table>
      ) : (
        <span>Нет презентаций ☹️</span>
      )}
    </>
  );
};

export default PresentationsBlock;

{
  /* <div className={styles.presentationBlock}>
      <h2>Презентации</h2>
      
    </div> */
}
