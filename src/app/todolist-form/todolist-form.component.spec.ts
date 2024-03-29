import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistFormComponent } from './todolist-form.component';

describe('TodolistformComponent', () => {
  let component: TodolistFormComponent;
  let fixture: ComponentFixture<TodolistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
