interface ISerializable<T> {
    deserialize(input: Object): T;
    createSerializeObject(): Object;
}