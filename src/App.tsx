import { useCounters, useModal } from './hooks';

import { AddCounterButton } from './components/AddCounterButton';
import { CounterDetails } from './components/CounterDetails';
import { CounterList } from './components/CounterList';
import { Header } from './components/Header';

const App = () => {
  const {
    counters,
    activeCounter,
    onSelectCounter,
    onCloseCounter,
    onEditCounter,
    onDeleteCounter,
    onAddCounter,
  } = useCounters();
  const { Modal, openModal, closeModal, showModal } = useModal();

  return (
    <div className="relative font-montserrat">
      <div className="p-8 max-w-md mx-auto">
        <Header />

        {activeCounter ? (
          <CounterDetails
            activeCounter={activeCounter}
            onCloseCounter={onCloseCounter}
            onEditCounter={onEditCounter}
            onDeleteCounter={onDeleteCounter}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <AddCounterButton
              onAddCounter={onAddCounter}
              openModal={openModal}
              closeModal={closeModal}
            />
            <CounterList
              counters={counters}
              onSelectCounter={onSelectCounter}
            />
          </div>
        )}
      </div>

      {showModal && <Modal />}
    </div>
  );
};
export default App;
