begin
Insert into RunCar ( 
            car_id,
			run_km,
			creator_id,
			create_date,
			editor_id,
			edit_date )
Select 
    car_id,
	run_km,
	@user_id,
	getutcdate(),
	@user_id,
	getutcdate()          
    from Import_RunCar


	end
		delete from Import_RunCar