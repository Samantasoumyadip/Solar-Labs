const Card = ()=> {
  return (
    <div className="App">


      <div className='review'>

    <form>

      <p> Choose the year </p>

      <div className="form-control">

        <label>
          <input type="checkbox" onChange={e => handleSelectAll(e)} checked={allFav} />
          Every year
        </label>

      </div>

      {preferences.map(preference => 

        <div className="form-control" key={preference.name} >
          <label>
            <input 
              type="checkbox"
              onChange={e => handleonChange(e, preference.name)}
              checked = {preference.selected}
            />
            { preference.name }
          </label>
        </div>

      )}

    </form>
</div>
    </div>
  )
}