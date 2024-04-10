const useDispatchEvent = (_name, _data = {}) => {
    window.dispatchEvent(new CustomEvent(_name, { detail: _data }));
    //console.log('useDispatchEvent', _name, _data);
};

export default useDispatchEvent;
